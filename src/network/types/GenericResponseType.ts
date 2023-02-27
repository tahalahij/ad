import {NetworkResponseStatus} from './ResponseStatusType';

export class GenericResponse<T> {
  constructor(private status: NetworkResponseStatus, private result: T) {}

  getStatus() {
    return this.status;
  }

  getResult() {
    return this.result;
  }
}
