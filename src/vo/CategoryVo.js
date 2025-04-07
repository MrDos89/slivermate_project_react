export default class CategoryVo {
    constructor({
      category_id,
      category_name,
      sub_category_id,
      sub_category_name,
      image,
      upd_date,
    }) {
      this.categoryId = category_id ?? 0;
      this.categoryName = category_name ?? "없음";
      this.subCategoryId = sub_category_id ?? 0;
      this.subCategoryName = sub_category_name ?? "없음";
      this.image = image ?? "";
      this.updDate = upd_date ?? "없음";
    }
  
    static fromJson(json) {
      return new CategoryVo({
        category_id: json.category_id,
        category_name: json.category_name,
        sub_category_id: json.sub_category_id,
        sub_category_name: json.sub_category_name,
        image: json.image,
        upd_date: json.upd_date,
      });
    }
  
    toJson() {
      return {
        category_id: this.categoryId,
        category_name: this.categoryName,
        sub_category_id: this.subCategoryId,
        sub_category_name: this.subCategoryName,
        image: this.image,
        upd_date: this.updDate,
      };
    }
  }
  