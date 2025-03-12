import { UAParser } from 'ua-parser-js';
import type { IResult } from 'ua-parser-js';

function getAgentData(userAgent: string): IResult {
  const parser = new UAParser();
  const result = parser.setUA(userAgent).getResult();
  return result;
}

export default getAgentData;
