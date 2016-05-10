import { createSelector } from 'reselect';
import Authorizer from '@ftbl/authorize';

export const authorizeSelector = (right, entitySelector) => {
  return createSelector(entitySelector, state => state.session.user, (entity, user) => {
    return true; // TEMP

    if (user == null) return false;

    const authorizer = new Authorizer(Authorizer.fromUser(user));

    return authorizer.can(entity, right);
  });
};

export const authorize = (claim, user) => {
  if (user == null) return false;

  const authorizer = new Authorizer(Authorizer.fromUser(user));

  return authorizer.can(claim);
};

export const Nothing = Authorizer.rights.Nothing;
export const Create = Authorizer.rights.Create;
export const Read = Authorizer.rights.Read;
export const Update = Authorizer.rights.Update;
export const Destroy = Authorizer.rights.Destroy;
export const Manage = Authorizer.rights.Manage;
