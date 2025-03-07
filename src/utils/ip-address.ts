import axios from 'axios';

export interface IpData {
  ip: string;
  country?: string;
  province?: string;
  city?: string;
}

async function getIpAddress(ip: string): Promise<IpData> {
  ip = ip?.replace(/^.*:/, '');
  const ipData = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
  if (ipData.data.status !== 'success') return { ip };
  return {
    ip,
    country: ipData.data.country,
    province: ipData.data.regionName,
    city: ipData.data.city,
  };
}

export default getIpAddress;
