// shadcn/ui primitives

export { useScrollAnimation } from "./animations/use-scroll-animation";
// Animations
export * from "./animations/variants";
// Canvas (3D / visual effects)
export { GalaxyBackground } from "./canvas/galaxy-background";
export { GalaxyEntrance } from "./canvas/galaxy-entrance";
export { ParticleField } from "./canvas/particle-field";
export { PixelNetwork } from "./canvas/pixel-network";
export { Alert, AlertDescription, AlertTitle } from "./primitives/alert";
export { Avatar, AvatarFallback, AvatarImage } from "./primitives/avatar";
export { Badge, badgeVariants } from "./primitives/badge";
export { Button, buttonVariants } from "./primitives/button";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./primitives/card";
export { Checkbox } from "./primitives/checkbox";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./primitives/dialog";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./primitives/dropdown-menu";
// New primitives — T01
export { Input } from "./primitives/input";
export { Label } from "./primitives/label";
export { Progress } from "./primitives/progress";
export { RadioGroup, RadioGroupItem } from "./primitives/radio-group";
export { ScrollArea, ScrollBar } from "./primitives/scroll-area";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./primitives/select";
export { Separator } from "./primitives/separator";
export { Skeleton } from "./primitives/skeleton";
export { Switch } from "./primitives/switch";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./primitives/tabs";
export { Textarea } from "./primitives/textarea";
export { Toaster, ToastProvider, useToast } from "./primitives/toast";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./primitives/tooltip";

// Layouts
export { DashboardLayout } from "./layouts/dashboard-layout";
export type { DashboardLayoutProps } from "./layouts/dashboard-layout";
export { MarketingLayout } from "./layouts/marketing-layout";
export type { MarketingLayoutProps } from "./layouts/marketing-layout";

// Utils
export { cn } from "./utils";
