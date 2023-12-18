import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";


interface ENV {
  SITE_URL: string;
  CONSUMER_KEY: string;
  CONSUMER_SECRET: string;
}


const getConfig = (): ENV => {
  const SITE_URL = process.env.NEXT_PUBLIC_STORE_URL;
  const CONSUMER_KEY = process.env.NEXT_PUBLIC_CK;
  const CONSUMER_SECRET = process.env.NEXT_PUBLIC_CS;

  if (!SITE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("Missing env variables");
  }

  return {
    SITE_URL,
    CONSUMER_KEY,
    CONSUMER_SECRET,
  };
}

const wooInit = (): WooCommerceRestApi => {
  const config = getConfig();
  const WooCommerce = new WooCommerceRestApi({
    url: config.SITE_URL,
    consumerKey: config.CONSUMER_KEY,
    consumerSecret: config.CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: false,
  });

  return WooCommerce;
};


export default wooInit;