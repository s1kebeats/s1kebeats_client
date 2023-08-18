let response;
export default async function register(username, email, password) {
  if (response instanceof Error) throw response;
  return response;
}

export function decorator(story, { parameters }) {
  if (parameters && parameters.registerResponse) {
    response = parameters.registerResponse;
  }
  return story();
}
