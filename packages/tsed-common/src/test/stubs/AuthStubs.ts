import { JWTPayload } from '../../types';

// TODO
export const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OSIsIm5hbWUiOiJUZXN0ZXIiLCJpYXQiOjE3MDEyNzU5NTMsImV4cCI6MTcwMTI3OTU1MywianRpIjoiZ0QwZDY0eDZRalpHaXFrVXZnOVNvN2x3elpLeTA2clAifQ.q4fIuy3kWKdi0MwOmXCAE3R0oH_OHDY6ht0F0TjtiBlub4oDjoc78lTLExA57Vzzczc-ct1U7o_Fi8AAR0iE3jFIDFLtK9ES_avwqFADTPbbrrziR9tgB2bvgT3qVSDxKY6QtjjJsDxLkoViZOEM-r8PIS8icSYiJEeEyOvW-ZAXMdGOQl4-JSLSmck-9L2H-yavTkh5zDythLiSawVqH51YO_bn9Nxk_FdRXbFzIR35kqV0IdRvfPkB40cCya6TnfmLghZQYRfQK2pZ1Ofi-cNwhrRhmYdS613Of6ldKpcb6RVeIb8i9hrb4l46WwfQc1l6GfkU8AORCCvJRZXqdg';
export const REFRESH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OSIsIm5hbWUiOiJUZXN0ZXIiLCJpYXQiOjE3MDEyNzU5NTMsImV4cCI6MTcwMTg4MDc1MywianRpIjoiUktGN1RTVVljV1Vlbkd0TExJSkMzc1BWWW5oakhSUUwifQ.ZD-R9ihlMqSqjDroYvoJ29iban_fIHxMNa7hOrgVmDdH5tUFRASldk_K41BLALMNSDkxT3S9-A0NtzeImBUNmlojdM5z6Wt3Qwx5aX7qHyXwY4QTr7k1vckE1r82nRicmNVJLFeo-ycOP0jGixZIMsjQm4jVsny3499StPivroX9XA0pdXb4M8hk49I96iH-Z7jg2WRuGq8CCejHo8A6KtbWrypYGGrmzTQyw1SV8ahpFl5gvQTfAgIusenM54X3kSv-cCcFiJxw7Bi0CEimbmr4S49OT4teHl7NYpMrNPr62CVU3sPf1Kc-U-ME_F6qEaM2OxHaFkrPNpKmjB3dtw';
export const BEARER_TOKEN = `Bearer ${ACCESS_TOKEN}`;
export const JWT_PAYLOAD: JWTPayload = {
  id: '123456789',
  name: 'Tester'
};
