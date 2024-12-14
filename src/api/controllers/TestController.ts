import {
  Get,
  JsonController,
  Req,
  Res
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/test")
export class TestController {
  constructor() {}

  @Get()
  public async test(@Req() request: any, @Res() response: any) {
    return response.status(200).send({
      status: 1,
      message: "test list...",
      data: [
        {
          name: "antony",
          age: "17",
        },
        {
          name: "marshal",
          age: "13",
        },
      ],
    });
  }
}
