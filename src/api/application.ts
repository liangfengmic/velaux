import { post, get, rdelete } from './request';
import {
  application_mock,
  getApplicationDetails_mock,
  getApplicationComponents_mock,
  createApplicationComponent_mock,
  getComponentDetails_mock,
  updateApplication_mock,
  getPolicyList_mock,
  createPolicy_mock,
  getPolicyDetails_mock,
  createApplicationTemplate_mock,
  createApplicationEnv_mock,
} from './devLink';
import { application, componentdefinition } from './productionLink';
import { getDomain } from '../utils/common';
import { ApplicationDeployRequest } from '../interface/application';

const baseURLOject = getDomain();
const isMock = baseURLOject.MOCK;
const url = isMock ? application_mock : application;

export function getApplicationList(params: any) {
  return get(url, { params: params }).then((res) => res);
}

export function createApplication(params: any) {
  return post(url, params).then((res) => res);
}

export function getApplicationDetails(params: any) {
  const url = isMock ? `${getApplicationDetails_mock}` : `${application}/${params.name}`;
  return get(url, params).then((res) => res);
}

export function getApplicationStatus(params: { name: string; envName: string }) {
  const url = isMock
    ? `${getApplicationDetails_mock}`
    : `${application}/${params.name}/envs/${params.envName}/status`;
  return get(url, params).then((res) => res);
}

export function deleteApplicationPlan(params: { name: string }) {
  return rdelete(url + '/' + params.name, params);
}

export function getApplicationComponents(params: { appName: string; envName: string }) {
  const { appName, envName } = params;
  const url = isMock
    ? `${getApplicationComponents_mock}`
    : `${application}/${appName}/components?envName=${envName}`;
  return get(url, params).then((res) => res);
}

export function createApplicationComponent(params: { appName: string; body: {} }) {
  const { appName, body } = params;
  const url = isMock
    ? `${createApplicationComponent_mock}`
    : `${application}/${appName}/componentplans`;
  return post(url, body).then((res) => res);
}

export function getComponentDetails(params: any) {
  const url = isMock
    ? `${getComponentDetails_mock}`
    : `${application}/${params.name}/componentplans/${params.componentName}`;
  return post(url, params).then((res) => res);
}

export function deployApplication(params: ApplicationDeployRequest) {
  const url = isMock ? `${updateApplication_mock}` : `${application}/${params.appName}/deploy`;
  return post(url, params).then((res) => res);
}

export function getPolicyList(params: any) {
  const url = isMock ? `${getPolicyList_mock}` : `${application}/${params.name}/policies`;
  return get(url, params).then((res) => res);
}

export function createPolicy(params: any) {
  const url = isMock ? `${createPolicy_mock}` : `${application}/${params.name}/policies`;
  return post(url, params).then((res) => res);
}

export function getPolicyDetails(params: any) {
  const url = isMock
    ? `${getPolicyDetails_mock}`
    : `${application}/${params.name}/policies/${params.policyName}`;
  return get(url, params).then((res) => res);
}

export function createApplicationTemplate(params: any) {
  const url = isMock
    ? `${createApplicationTemplate_mock}`
    : `${application}/${params.name}/template`;
  return post(url, params).then((res) => res);
}

export function getComponentdefinitions(params: any) {
  const url = isMock ? `${getPolicyDetails_mock}` : `${componentdefinition}`;
  return get(url, { params: { type: 'component' } }).then((res) => res);
}

export function detailComponentDefinition(params: { name: string }) {
  const url = isMock ? `${getPolicyDetails_mock}` : `${componentdefinition}/${params.name}`;
  return get(url, { params: { type: 'component' } }).then((res) => res);
}

export function createApplicationEnv(params: { appName?: string }) {
  const url = isMock ? `${createApplicationEnv_mock}` : `${application}/${params.appName}/envs`;
  delete params.appName;
  return post(url, params).then((res) => res);
}