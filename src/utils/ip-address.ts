import axios from 'axios';

export interface IpData {
  ip: string;
  country: string;
  province: string;
  city: string;
}

async function getIpAddress(ip: string | undefined): Promise<IpData> {
  if (!ip || ip.length < 10) {
    return {
      ip: '-',
      country: '-',
      province: '-',
      city: '-',
    };
  }
  ip = ip?.replace(/^.*:/, '');
  const response = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
  const success = response.data.status === 'success';
  return {
    ip,
    country: success ? response.data.country : '-',
    province: success ? response.data.regionName.slice(0, -1) : '-',
    city: success ? response.data.city : '-',
  };
}

export default getIpAddress;
