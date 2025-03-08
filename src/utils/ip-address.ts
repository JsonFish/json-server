import axios from 'axios';

export interface IpData {
  ip: string;
  country: string;
  province: string;
  city: string;
}

async function getIpAddress(ip: string): Promise<IpData> {
  ip = ip?.replace(/^.*:/, '');
  const ipData = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
  if (ipData.data.status !== 'success') {
    return { ip, country: '未知', province: '未知', city: '未知' };
  }
  return {
    ip,
    country: ipData.data.country,
    province: ipData.data.regionName.slice(0, -1),
    city: ipData.data.city,
  };
}

export default getIpAddress;
