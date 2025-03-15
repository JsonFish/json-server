import { UAParser } from 'ua-parser-js';
import type { IResult } from 'ua-parser-js';

function getAgentData(userAgent: string): IResult {
  const parser = new UAParser();
  return parser.setUA(userAgent).getResult();
}

export default getAgentData;
