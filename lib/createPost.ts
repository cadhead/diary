import fs from 'fs/promises';
import { POST_DIR_PATH } from "lib/constants";
import { v4 as uuidv4 } from 'uuid';
import { join } from "path";

function getTemplate(post: IPost): string {
  const { title, content, date, category } = post;

  const template = `---\
  \ntitle: ${title}\
  \ndate: ${date}\
  \ncategory: ${category}
  \n---\
  \n\n${content}`

  return template;
}

function generateID(): string {
  return uuidv4();
}

function generateMDFile(post: IPost): Promise<any> {
  const template = getTemplate(post);
  const id = post.slug || generateID()
  const mdFileName = join(POST_DIR_PATH, `${id}.md`);

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFile(mdFileName, template).then(() => {
        const payload: ICreatedPostPayload = { created: true, id }
        resolve(payload);
      })
    } catch (error) {
      reject({ created: false, error });
    }
  });
}

export async function postCreate(post: IPost): Promise<ICreatedPostPayload> {
  const payload = await generateMDFile(post);

  return payload;
}