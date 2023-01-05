import $api from '../http';
import { AxiosResponse } from 'axios';

class FileService {
  static async login(
    file: File,
    path: string
  ): Promise<AxiosResponse<FileUploadResponse>> {
    return $api.post<FileUploadResponse>('/login', { username, password });
  }
}
export default FileService;
