import type { ComponentProps, PropsWithChildren } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "flex items-center justify-center gap-2 rounded-lg px-5 font-medium",

	variants: {
		variant: {
			primary: "bg-lime-300 text-zinc-950 hover:bg-lime-400",
			secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
		},

		size: {
			default: "py-2",
			full: "w-full h-11",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

export function Button({ variant, size, ...props }: ButtonProps) {
	return <button type="button" {...props} className={buttonVariants({ variant, size })} />;
}

interface ButtonProps extends PropsWithChildren, ComponentProps<"button">, VariantProps<typeof buttonVariants> {}
