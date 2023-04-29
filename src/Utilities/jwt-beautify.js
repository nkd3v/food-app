export default function jwtBeautify(claims) {
    const readableClaims = {
      sub: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      email: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      firstName: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
      lastName: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
      role: claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      expirationTime: claims.exp,
      issuer: claims.iss,
      audience: claims.aud,
      uid: claims.id,
    };
  
    return readableClaims;
  }