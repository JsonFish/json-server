import { UAParser } from 'ua-parser-js';
import type { IResult } from 'ua-parser-js';

function getAgentData(userAgent: string): IResult {
  const parser = new UAParser(userAgent);
  return parser.getResult();
}

export default getAgentData;
