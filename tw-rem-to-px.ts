// tw-rem-to-px.ts
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

type RemToPxInput = string | object | Function | null;

function isFunction(input: RemToPxInput): input is (...args: any[]) => any {
  return typeof input === "function";
}

function replaceRemWithPx(input: RemToPxInput, baseFontSize = 16): RemToPxInput {
  if (input == null) return input;

  if (typeof input === "string") {
    return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * baseFontSize}px`);
  }

  if (Array.isArray(input)) return input.map((val) => replaceRemWithPx(val, baseFontSize));

  if (typeof input === "object") {
    const ret: Record<string, RemToPxInput> = {};
    // @ts-expect-error issue with any type
    for (const key in input) ret[key] = replaceRemWithPx(input[key], baseFontSize);

    return ret;
  }

  if (isFunction(input)) {
    return function (...args: any[]): any {
      const replacedArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg.replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * baseFontSize}px`);
        }
        return arg;
      });
      return input(...replacedArgs);
    };
  }

  return input;
}

interface PluginOptions {
  baseFontSize?: number;
}

export default plugin.withOptions<PluginOptions>(
  (options) => {
    return function ({ addBase, addComponents, addUtilities, theme }) {};
  },
  (options) => {
    const baseFontSize = options?.baseFontSize ?? 16;

    return {
      theme: {
        extend: replaceRemWithPx(defaultTheme, baseFontSize) as typeof defaultTheme,
      },
    };
  },
);
