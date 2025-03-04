import axios from 'axios';

export interface IpData {
  country: string;
  regionName: string;
  city: string;
}

async function getIpAddress(ip: string): Promise<IpData | false> {
  if (!ip) return false;
  const ipData = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
  if (ipData.data.status !== 'success') return false;
  return {
    country: ipData.data.country,
    regionName: ipData.data.regionName,
    city: ipData.data.city,
  };
}

export default getIpAddress;
