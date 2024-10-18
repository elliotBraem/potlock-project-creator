import { swagger } from "@elysiajs/swagger";
import { getMainnetRpcProvider, view } from '@near-js/client';
import { Elysia } from "elysia";

export enum RegistrationStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
  Graylisted = "Graylisted",
  Blacklisted = "Blacklisted",
  Unregistered = "Unregistered",
}
export interface Registration {
  id: string;
  registrant_id: string;
  list_id: number;
  status: RegistrationStatus;
  submitted_ms: number;
  updated_ms: number;
  admin_notes: null | string;
  registrant_notes: null | string;
  registered_by: string;
}

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/project/:projectId", async ({ params: { projectId } }) => {
    try {
      const registrations = await view<Registration[]>({
        account: 'lists.potlock.near',
        method: 'get_registrations_for_registrant',
        args: {
          registrant_id: projectId
        },
        deps: { rpcProvider: getMainnetRpcProvider() },
      });
      return registrations;
    } catch (e: any) {
      console.error(e);
      return [];
    }
  })
  .post("/project/create", async ({ headers }) => {
    const mbMetadata = JSON.parse(headers["mb-metadata"] || "{}");
    const accountId = mbMetadata?.accountData?.accountId || "near";


    return {
      id: "myproject.near",
      name: "test",
      description: "heyyyyyy",
      functionCalls: [
        {
          methodName: "",
          
        },
        {
          methodName: ""
        },
      ]
    }
  })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
