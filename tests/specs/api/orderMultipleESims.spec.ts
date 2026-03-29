import { expect, test } from "@playwright/test";
import { authenticate } from "../../utils/auth.js";
import { OrderResponse } from "../../types/api/order.js";
import { SimDetailResponse } from "../../types/api/sim.js";
import { Sim } from "../../types/api/sim.js";

test.describe.serial("Order multiple eSIMs", async () => {
  let accessToken: string;
  let simsFromOrder: Sim[] = [];

  test.beforeAll(async ({ request }) => {
    accessToken = await authenticate(request);
  });

  test("POST an order for 6 eSIMs", async ({ request }) => {
    const response = await request.post("orders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      multipart: {
        package_id: "moshi-moshi-7days-1gb",
        quantity: 6,
        type: "sim",
      },
    });
    const body: OrderResponse = await response.json();
    console.log("Response body:", body);
    expect(response.status()).toBe(200);
    expect(body.meta.message).toBe("success");

    // order validations
    expect(body.data.package_id).toBe("moshi-moshi-7days-1gb");
    expect(body.data.quantity).toBe(6); // returns number instead of string, API docs say it should be string
    expect(body.data.type).toBe("sim");
    expect(body.data.esim_type).toBeDefined();
    expect(body.data.validity).toBeGreaterThan(0);
    expect(body.data.package).toBeDefined();
    expect(body.data.data).toBeDefined();
    expect(body.data.price).toBeGreaterThan(0);
    expect(body.data.pricing_model).toBeDefined();
    expect(body.data.created_at).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.code).toBeDefined();
    expect(body.data.currency).toBeDefined();
    expect(body.data.manual_installation).toBeDefined();
    expect(body.data.qrcode_installation).toBeDefined();
    expect(body.data.installation_guides).toBeDefined();
    expect(body.data.brand_settings_name).toBeDefined();

    // sim validations
    expect(body.data.sims).toHaveLength(6);
    body.data.sims.forEach(sim => {
      expect(sim.id).toBeDefined();
      expect(sim.created_at).toBeDefined();
      expect(sim.iccid).toBeDefined();
      expect(sim.lpa).toBeDefined();
      expect(sim.matching_id).toBeDefined();
      expect(sim.qrcode).toBeDefined();
      expect(sim.qrcode_url).toBeDefined();
      expect(sim.direct_apple_installation_url).toBeDefined();
      expect(sim.apn_type).toBeDefined();
      expect(typeof sim.is_roaming).toBe("boolean");
      expect(sim.apn).toBeDefined();
      if (sim.apn) {
        expect(sim.apn.ios.apn_type).toBeDefined();
        expect(sim.apn.android.apn_type).toBeDefined();
      }
    });

    simsFromOrder = body.data.sims;
  });

  test("GET details for each eSIM from the order", async ({ request }) => {
    for (const sim of simsFromOrder) {
      const response = await request.get(`sims/${sim.iccid}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { include: "order,order.status,order.user,share" },
      });

      expect(response.status()).toBe(200);
      const body: SimDetailResponse = await response.json();
      console.log("Response body:", body);
      expect(body.meta.message).toBe("success");

      expect(body.data.iccid).toBe(sim.iccid);
      expect(body.data.simable.package_id).toBe("moshi-moshi-7days-1gb");
      expect(body.data.simable.status).toBeDefined(); // from order.status param
      expect(body.data.simable.user).toBeDefined(); // from order.user param
      expect(body.data.sharing).toBeDefined(); // from share param
    }
  });
});
