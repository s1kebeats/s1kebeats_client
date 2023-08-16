let available;
export default async function usernameAvailable() {
  return available ?? false;
}

export function decorator(story, { parameters }) {
  if (parameters && parameters.usernameAvailable) {
    available = parameters.usernameAvailable;
  }
  return story();
}
