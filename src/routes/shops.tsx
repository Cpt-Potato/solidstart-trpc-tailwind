import { createSignal, Suspense } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Title } from 'solid-start';
import { trpc } from '~/utils/trpc';
import ForComponent from '~/components/ForComponent';

type Step = 'city' | 'district' | 'shop' | 'shoppingCart';

const Shops = () => {
  const cities = trpc.getCities.useQuery(() => {});
  const cityDistricts = trpc.getDistricts.useMutation();
  const districtShops = trpc.getShops.useMutation();

  const [step, setStep] = createSignal<Step>('city');
  const [city, setCity] = createSignal('');
  const [district, setDistrict] = createSignal('');
  const [shop, setShop] = createSignal('');

  const handleCityClick = (cityId: number, cityName: string) => {
    cityDistricts.mutate({ cityId });
    setStep('district');
    setCity(cityName);
  };
  const handleDistrictClick = (districtId: number, districtName: string) => {
    districtShops.mutate({ districtId });
    setStep('shop');
    setDistrict(districtName);
  };
  const handleShopClick = (shopId: number, shopName: string) => {
    setStep('shoppingCart');
    setShop(shopName);
  };

  const options = {
    city: <ForComponent items={cities.data} onclick={handleCityClick} />,
    district: <ForComponent items={cityDistricts.data} onclick={handleDistrictClick} />,
    shop: <ForComponent items={districtShops.data} onclick={handleShopClick} />,
  };

  return (
    <>
      <Title>Shops</Title>
      <div class="mx-auto absolute top-6 left-0 right-0 text-center">
        {step() === 'district' && <p>Вы выбрали: {city()}</p>}
        {step() === 'shop' && <p>Вы выбрали: {district()}</p>}
      </div>
      {step() !== 'city' && (
        <button
          class="absolute top-4 right-4 p-1.5 bg-amber-400 hover:bg-amber-500 rounded-xl"
          onClick={[setStep, 'city']}
        >
          Сбросить
        </button>
      )}
      <div class="mt-[calc(90vh/2)] mx-auto px-2 max-w-[600px] flex justify-center items-center gap-4 flex-wrap">
        <Suspense fallback={<div class="font-bold text-2xl text-gray-500">Loading...</div>}>
          <Dynamic component={options[step()]} />
          {step() === 'shoppingCart' && <p>Вы выбрали: {shop()}</p>}
        </Suspense>
      </div>
    </>
  );
};

export default Shops;
