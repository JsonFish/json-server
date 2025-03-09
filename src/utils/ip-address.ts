import axios from 'axios';

export interface IpData {
  ip: string;
  country: string;
  province: string;
  city: string;
}

async function getIpAddress(ip: string): Promise<IpData> {
  ip = ip?.replace(/^.*:/, '');
  const response = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
  const success = response.data.status === 'success';
  return {
    ip,
    country: success ? response.data.country : '未知',
    province: success ? response.data.regionName.slice(0, -1) : '未知',
    city: success ? response.data.city : '未知',
  };
}

export default getIpAddress;
