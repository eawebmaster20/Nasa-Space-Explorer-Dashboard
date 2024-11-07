import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = '0UH2kWt1eNWANemPHdmENx0IDdYPXg4Ka9ndeFej'; 
  const clonedRequest = req.clone({
    setParams: {
      api_key: apiKey 
    }
  });
  console.log(clonedRequest.urlWithParams);
  return next(clonedRequest);
};