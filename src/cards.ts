import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import AWS from "aws-sdk";
import exifr from "exifr";

const S3 = new AWS.S3();

interface CardItem {
  id: string,
  title: string,
  description: string,
  imageSrc: string
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const bucketName = process.env.BUCKET_NAME
  let items = [] as CardItem[]
  if (bucketName) {

    const keys = await listLabels(bucketName);
    items = await Promise.all(keys.map(key => getCardItem(key, bucketName)))
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(items),
  };
};

async function getCardItem(key: string, bucketName: string) {
  const bucketUrl = `https://${bucketName}.s3.amazonaws.com/`;

  const labelObject = await S3.getObject({ Bucket: bucketName, Key: key }).promise()

  const metadata = await exifr.parse(labelObject.Body!, true)
  const title = metadata?.title?.value;
  const description = metadata?.description?.value;

  return { id: key, imageSrc: bucketUrl + key, title: title, description: description } as CardItem
}

async function listLabels(bucketName: string) {
  const listParams = {
    Bucket: bucketName
  };

  const labelSearch = await S3.listObjects(listParams).promise();
  const keys = labelSearch.Contents!.map(item => item.Key);
  return keys.filter((s): s is string => s != null).filter(key => key.endsWith(".png"));
}

