import { JWTAuthenticationResponse } from '../../models';

// JWT and REFRESH tokens generated with following keys!
export const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA0V0R/JjtW3cMkrEHA4fDBNK6HTeYSoewODyAQSO0TarzfNfj
vIyFpMtVobYSfskeWDZL5QC2V65Qc27LVQcf6+Qwsi9djNuvmNkJ6KaaS9nDQRvP
Pw0PMOWfZma1YEulJLfBSquXVEugjv+plzX4zDFm0HsnKv6ccmN0tNJ8PggueFoR
0KYlyQrae14u5zaY3WoBr1yMWJ27yzY/qIEGJF7hxX4mcipzT4tiYpN0Ati4HAbj
jf9d9fB+OFPoEyj18tk1lYKqx/3Z4GriwcQWnCqxqN5b+TJuawTxU1QVY/9EzoeT
VwYzecMkhEgRsNR53kiwT0RGeXvzaZlRbSdAEwIDAQABAoIBAAiYvLtVgDGIQuDn
GfWgJnbVPEUk2kD9L1Qvz8hc8fNaeKMArl44mug4XSzFsB66nV9b42Pk0pfpFW6X
9wtnvnzOIt2+KiY1gxFQoCKIbL9+kpDi1nCtVZlZZGEtCHeKw54tWWd6gj042b/l
aY5G7g9cW+9ljycpyzy7LriaB/X4BwU7UjVnhaCfYxxLf+sOcSxXBgetCFll2Y0t
nfS4sSlzB6i9Acs7UisZPuqR5tDGJt/8/MujoEB70kigA51c3nv/4mu+krZqnOaB
WMogQ1osnLAMwtbaX+bmq2oetjF51OS2kG/X6QrhhU7K7G2vZRiHwARxR7HZ2CZE
tvbfxKECgYEA6NEn14Vavw4XpU6RpQxKpXMuInED/dOT6hE5EPgSlCXQE6YB7CdW
VNIG8r5cGSZzUYzckhGfNzgFbZ/LiMTrQFdwCVT2ShXB9kmX92eMQbFqjXpbQ3ss
kQDjxaOnljsNylehEbscoQ9C6hx9Hh8hfdCgt2TbyytBe64o0332h8MCgYEA5jYN
Rk6N/ZiCyYQScK/7oDH+AEhsiDM0uoL8mUzEQ+/jpwu6xh0PKHBx4kr/85QZVBcf
NVzAb2mHe9y2xht9XgDJT60wiC1NvmGfI7h9IytA3jJeq7K0pUKwyjIuzDLuBLwE
jb9EuButlo73ElV/WUosuXHAp+j07R0/ehKzMXECgYEAzoZ7aVwKm+DMaP/Bgz/c
F9iM3FCU0d2WINUWYk8ta+3/Hu7sVaivlJ6bO0pSOJ07PuRN5eVr73fqmMxfqPvG
FFV8NUsBD8ctQGUYQYfBi6TueIJJ4xqo9hhr9S6vwzyvhwclAq2RP+5h1XtgIhBL
jWg8qXL25suAU06zOKlMwDECgYEAjgdQ/0xdu9SI9CzAd7eLRZUyQRhtpUX6RQul
Lis3dzacPCY3cBzjii59hICDEtMPIVs2jOSRcOsphFhyhxzUptdTXA3cwFc6/Lcb
yJz8z2LTHYLz93hEjSTtD4IQbzkIsfER2iXkDrY8zYOcmToYXI0vtKWil7VYzqVZ
0UWSOnECgYEAyBZeb9216onhteUPt5SeULHx0hgyJvhX6lHLx7bxrTcg1cSxB5vu
wZgEf3ekEJ36W+NuiQVP6NHDzGPuI6m4g8Flcj/QMRoNz1hCAh7b8/81/cXYoFOv
4pMx/W2Kpo7+2qkRYfoMDMFV5UpE6TG3hHyzW2Qs5sZt0sr1xjBVj7g=
-----END RSA PRIVATE KEY-----`;
export const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0V0R/JjtW3cMkrEHA4fD
BNK6HTeYSoewODyAQSO0TarzfNfjvIyFpMtVobYSfskeWDZL5QC2V65Qc27LVQcf
6+Qwsi9djNuvmNkJ6KaaS9nDQRvPPw0PMOWfZma1YEulJLfBSquXVEugjv+plzX4
zDFm0HsnKv6ccmN0tNJ8PggueFoR0KYlyQrae14u5zaY3WoBr1yMWJ27yzY/qIEG
JF7hxX4mcipzT4tiYpN0Ati4HAbjjf9d9fB+OFPoEyj18tk1lYKqx/3Z4GriwcQW
nCqxqN5b+TJuawTxU1QVY/9EzoeTVwYzecMkhEgRsNR53kiwT0RGeXvzaZlRbSdA
EwIDAQAB
-----END PUBLIC KEY-----`;
export const JWT_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OSIsIm5hbWUiOiJUZXN0ZXIiLCJpYXQiOjE3MDEyNzU5NTMsImV4cCI6MTcwMTI3OTU1MywianRpIjoiZ0QwZDY0eDZRalpHaXFrVXZnOVNvN2x3elpLeTA2clAifQ.q4fIuy3kWKdi0MwOmXCAE3R0oH_OHDY6ht0F0TjtiBlub4oDjoc78lTLExA57Vzzczc-ct1U7o_Fi8AAR0iE3jFIDFLtK9ES_avwqFADTPbbrrziR9tgB2bvgT3qVSDxKY6QtjjJsDxLkoViZOEM-r8PIS8icSYiJEeEyOvW-ZAXMdGOQl4-JSLSmck-9L2H-yavTkh5zDythLiSawVqH51YO_bn9Nxk_FdRXbFzIR35kqV0IdRvfPkB40cCya6TnfmLghZQYRfQK2pZ1Ofi-cNwhrRhmYdS613Of6ldKpcb6RVeIb8i9hrb4l46WwfQc1l6GfkU8AORCCvJRZXqdg';
export const REFRESH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OSIsIm5hbWUiOiJUZXN0ZXIiLCJpYXQiOjE3MDEyNzU5NTMsImV4cCI6MTcwMTg4MDc1MywianRpIjoiUktGN1RTVVljV1Vlbkd0TExJSkMzc1BWWW5oakhSUUwifQ.ZD-R9ihlMqSqjDroYvoJ29iban_fIHxMNa7hOrgVmDdH5tUFRASldk_K41BLALMNSDkxT3S9-A0NtzeImBUNmlojdM5z6Wt3Qwx5aX7qHyXwY4QTr7k1vckE1r82nRicmNVJLFeo-ycOP0jGixZIMsjQm4jVsny3499StPivroX9XA0pdXb4M8hk49I96iH-Z7jg2WRuGq8CCejHo8A6KtbWrypYGGrmzTQyw1SV8ahpFl5gvQTfAgIusenM54X3kSv-cCcFiJxw7Bi0CEimbmr4S49OT4teHl7NYpMrNPr62CVU3sPf1Kc-U-ME_F6qEaM2OxHaFkrPNpKmjB3dtw';
export const BEARER_TOKEN = `Bearer ${JWT_TOKEN}`;
export const JWT_PAYLOAD: JWTAuthenticationResponse = {
  id: '123456789',
  name: 'Tester'
};