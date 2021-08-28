import { environment } from '../../environments/environment'


export const staticUrl = (url: string) => environment.staticServerUrl + url
