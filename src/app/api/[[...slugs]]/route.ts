import { swagger } from "@elysiajs/swagger";

import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/project/:projectId", async ({ params: { projectId } }) => {
    // const projectMatch = searchProject(projectId)[0];
    const projectMatch = {
      id: "myproject.near",
      name: "test",
      description: "heyyyyyy"
    };

    async function getProjectData(projectId: string) {
      return Promise.resolve(projectMatch);
    }

    const data = await getProjectData(projectId);
    // if (!projectMatch) {
    //   return {
    //     error: `Project ${projectId} not found`,
    //   };
    // }
    // const tokenMetadata = await getProjectData(projectId.id); // get project data
    // if (!tokenMetadata) {
    //   return {
    //     error: `Metadata for project ${projectId} not found`,
    //   };
    // }

    return {
      ...data,
      icon: "",
    };
  })
  .post("/project/create", async ({ headers }) => {
    const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
    const accountId = mbMetadata?.accountData?.accountId || "near";

    return {
      id: "myproject.near",
      name: "test",
      description: "heyyyyyy",
      functionCalls: {

      }
    }
  })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
