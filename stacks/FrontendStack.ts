import * as sst from "@serverless-stack/resources";

interface FrontendStackProps extends sst.StackProps {
  apiUrl : string
}

export default class FrontendStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const reactApp = new sst.ReactStaticSite(this, "Frontend", {
       path : "frontend",
       environment: {
          REACT_APP_API_URL : props.apiUrl
       }
    });

    // Show the url of frontend app
    this.addOutputs({
      "ReactAppUrl": reactApp.url 
    });
  }
}
