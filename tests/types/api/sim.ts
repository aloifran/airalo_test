export interface Sim {
  id: number;
  created_at: string;
  iccid: string;
  lpa: string;
  imsis: string | null;
  matching_id: string;
  qrcode: string;
  qrcode_url: string;
  direct_apple_installation_url: string;
  airalo_code: string | null;
  apn_type: string;
  apn_value: string | null;
  is_roaming: boolean;
  confirmation_code: string | null;
  apn: { ios: ApnConfig; android: ApnConfig } | null;
  msisdn: string | null;
}

export interface SimDetail extends Sim {
  voucher_code: string | null;
  order: unknown | null;
  brand_settings_name: string | null;
  recycled: boolean;
  recycled_at: string | null;
  sharing: { link: string | null; access_code: string | null };
  simable: Simable;
}

interface SimableStatus {
  name: string;
  slug: string;
}

interface SimableUser {
  id: number;
  created_at: string;
  name: string;
  email: string;
  mobile: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  postal_code: string | null;
  country_id: number | null;
  company: string;
}

interface Simable {
  id: number;
  created_at: string;
  code: string;
  description: string | null;
  type: string;
  package_id: string;
  quantity: number;
  package: string;
  esim_type: string;
  validity: string;
  price: string;
  data: string;
  currency: string;
  manual_installation: string;
  qrcode_installation: string;
  installation_guides: Record<string, string>;
  text: string | null;
  voice: string | null;
  net_price: number;
  status: SimableStatus;
  user: SimableUser;
}

interface ApnConfig {
  apn_type: string;
  apn_value: string | null;
}

export interface SimDetailResponse {
  data: SimDetail;
  meta: {
    message: string;
  };
}
