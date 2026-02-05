import { Box } from "@mui/material";
import Link from "next/link";

const FooterLabels = ({ text }: { text?: string }) => {
  return (
    <Box>
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-[#E35E14] hover:underlin pr-[30px]"
      >
        Privacy Policy
      </Link>
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-[#E35E14] hover:underline "
      >
        Terms of Service
      </Link>
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-[#E35E14] hover:underline pl-[30px]"
      >
        Help Center
      </Link>
    </Box>
  );
};

export default FooterLabels;
