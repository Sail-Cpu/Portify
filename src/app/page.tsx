import {createClient} from "@/src/utils/supabase/server";

export default async function Home() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="">
      {
        user ?
            <h1>welcome, {user?.email}</h1>
            :
            <h1>Not logged in</h1>
      }
    </div>
  );
}
