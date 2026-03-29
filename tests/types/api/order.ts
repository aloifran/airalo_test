import { Sim } from "./sim.js";

export interface OrderData {
  package_id: string;
  quantity: string;
  type: string;
  description: string;
  esim_type: string;
  validity: number;
  package: string;
  data: string;
  price: number;
  pricing_model: string;
  created_at: string;
  id: number;
  code: string;
  currency: string;
  manual_installation: string;
  qrcode_installation: string;
  installation_guides: Record<string, string>;
  brand_settings_name: string;
  sims: Sim[];
}

export interface OrderResponse {
  data: OrderData;
  meta: {
    message: string;
  };
}
