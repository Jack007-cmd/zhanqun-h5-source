import {Injectable} from "@angular/core";
import {AppHttp} from "../../../service/app-http.service";

@Injectable()
export class PrecisionPlanService {

  constructor(private appHttp: AppHttp) {

  }

  /**
   * GET
   * 精准计划 - 专家中奖率排行榜
   * @param code
   * @param size
   */
  getAboutSort(code, size) {
    return this.appHttp.get("/v1/web/lottery/recommend-plan/index", {code: code, size: size});
  }

  /**
   * GET
   * 精准计划 - 中奖详情
   * @param code
   * @param size
   * @param expert_no
   * @param expert_id
   * @param date
   */
  getExpertDetail(code, size, expert_no, expert_id, date,page=1) {
    return this.appHttp.get("/v1/web/lottery/recommend-plan/detail", {
      code: code,
      size: size,
      expert_no: expert_no,
      expert_id: expert_id,
      date: date,
      page:page
    });
  }
}
