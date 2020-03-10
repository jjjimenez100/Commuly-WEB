import { getUserDetails } from './jwt';
import { EMPLOYEE_ROLE, PROGRAM_ADMINISTRATOR_ROLE, SUPERVISOR_ROLE } from '../constants/user';

const getRole = () => {
  const { role = '' } = getUserDetails();
  return role;
};

const isEmployee = () => {
  return getRole() === EMPLOYEE_ROLE;
};

const isProgramAdministrator = () => {
  return getRole() === PROGRAM_ADMINISTRATOR_ROLE;
};

const isSupervisor = () => {
  return getRole() === SUPERVISOR_ROLE;
};

export { getRole, isEmployee, isProgramAdministrator, isSupervisor };
