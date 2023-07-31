import Button from './Button.vue';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

const buttonTypes: InstanceType<typeof Button>['$props']['type'][] = [
  'primary',
  'secondary',
  'subtle',
  'ghost',
];
const buttonSizes: InstanceType<typeof Button>['$props']['size'][] = [
  'sm',
  'md',
  'lg',
  'xl',
];

// export const Presentation = () => (
//   <div class="grid gap-5">
//     {buttonTypes.map((type) => {
//       return (
//         <div class="flex flex-col gap-5 items-start">
//           {buttonSizes.map((size) => {
//             return (
//               <Button type={type} size={size} key={size! + type!}>
//                 Button
//               </Button>
//             );
//           })}
//         </div>
//       );
//     })}
//   </div>
// );

export const Primary = {
  render: () => ({
    components: { Button },
    template: '<Button> Button </Button>',
  }),
};
