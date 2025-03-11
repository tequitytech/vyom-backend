export default class PageResource {
  constructor(data) {
    this.id = data?.id;
    this.documentId = data?.documentId;
    this.title = data?.title;
    this.type = data?.type;
    this.page_content_type = data?.page_content_type;
    this.text_content = data?.text_content;
    this.duration = data?.duration;
    this.video_urls = data?.video_urls || [];
    this.image_urls = data?.image_urls;
    this.audio_urls = data?.audio_urls;
    this.position = data?.position;
    this.questions = data?.questions?.map((q) => new QuestionResource(q)) || [];
    this.next_page = data?.next_page;
    this.meta = data?.meta;
  }
}

class QuestionResource {
  constructor(data) {
    this.id = data?.id;
    this.documentId = data?.documentId;
    this.question_title = data?.question_title;
    this.answer_type = data?.answer_type;
    this.question_decription = data?.question_decription;
    this.options = data?.options?.map((o) => new OptionResource(o)) || [];
  }
}

class OptionResource {
  constructor(data) {
    this.id = data?.id;
    this.text = data?.text;
    this.position = data?.position;
    this.type = data?.type;
    this.image = data?.image;
    this.next_page = data?.next_page?.documentId;
  }
}
