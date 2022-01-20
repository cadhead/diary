import fs from 'fs/promises';
import { POST_DIR_PATH } from "lib/constants";
import { join } from "path";

function removeMDFile(slug: string): Promise<any> {
  const mdFileName = join(POST_DIR_PATH, `${slug}.md`);

  return new Promise(async (resolve, reject) => {
    try {
      fs.rm(mdFileName).then(() => {
        const payload = { deleted: true, id: slug };
        resolve(payload);
      })
    } catch (error) {
      reject({ deleted: false, error });
    }
  });
}

export async function postDelete(slug: string) {
  const payload = await removeMDFile(slug);

  return payload;
}
