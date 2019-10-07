import { IDeserializedSrn } from './types';

export function deserializeSrn(srn: string): IDeserializedSrn {
  const [service, org, project, ...uriParts] = srn.split('/');

  const uri = uriParts.length ? `/${uriParts.join('/')}` : '';

  return {
    service,
    org,
    project,
    uri,
  };
}
