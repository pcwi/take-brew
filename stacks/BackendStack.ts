import * as sst from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment"

export default class BackendStack extends sst.Stack {
  public readonly apiUrl;
  public readonly labelBucket;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    
    this.labelBucket = this.createLabelBucket();

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
      defaultFunctionProps: {
        environment: {
          BUCKET_NAME: this.labelBucket.bucketName,
        },
        permissions: [this.labelBucket]
      }
    });

    this.apiUrl = api.url;

    // Show the endpoint in the output
    this.addOutputs({
      "BucketName": this.labelBucket.bucketName,
      "ApiEndpoint": api.url,
    });
  }

  private createLabelBucket() {
    let removalPolicy = {};
    if (process.env.DELETE_LABEL_S3_AFTER_UNDEPLOY) {
      removalPolicy = {
        // Delete all the files
        autoDeleteObjects: true,
        // Remove the bucket when the stack is removed
        removalPolicy: RemovalPolicy.DESTROY,
      };
    }

    const labelBucket = new sst.Bucket(this, 'Bucket', {
      s3Bucket: {
        ...removalPolicy
      }
    });
    //Allow accessing objects using public URL
    labelBucket.s3Bucket.grantPublicAccess();

    if (process.env.DEPLOY_INITIAL_LABELS) {
      new s3deploy.BucketDeployment(this, 'InitialLabelDeploy', {
        sources: [s3deploy.Source.asset('./s3static')],
        destinationBucket: labelBucket.s3Bucket
      });
    }
    return labelBucket;
  }
}
