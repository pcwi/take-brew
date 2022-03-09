import BackendStack from "./BackendStack";
import * as sst from "@serverless-stack/resources";
import FrontendStack from "./FrontendStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  const backend = new BackendStack(app, "backend");
  const frontend = new FrontendStack(app, "frontend", {  apiUrl: backend.apiUrl})

  // Add more stacks
}
