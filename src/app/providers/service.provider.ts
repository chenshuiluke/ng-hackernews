import { StoriesService } from "../services/stories.service";

export const ServiceProvider = [
  {provide:StoriesService, useClass:StoriesService}
];
