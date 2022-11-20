import { ParentComponent, Switch, Match } from 'solid-js';
import { Title } from 'solid-start';
import { trpc } from '~/utils/trpc';

const Home: ParentComponent = () => {
  const hello = trpc.hello.useQuery(() => ({ name: 'from tRPC' }));

  return (
    <>
      <Title>Home</Title>
      <div>
        <Switch
          fallback={
            <pre class="font-bold text-2xl text-gray-500">
              {JSON.stringify(hello.data)}
            </pre>
          }
        >
          <Match when={hello.isLoading}>
            <div class="font-bold text-2xl text-gray-500">Loading...</div>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;
