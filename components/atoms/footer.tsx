import { Box } from "@mui/material";
import Link from "next/link";

const FooterLabels = ({ text }: { text?: string }) => {
  return (
    <Box>
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-[#9CA3AF] hover:underlin pr-[30px]"
      >
        Privacy Policy
      </Link>
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-[#9CA3AF] hover:underline "
      >
        Terms of Service
      </Link>
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-[#9CA3AF] hover:underline pl-[30px]"
      >
        Help Center
      </Link>
    </Box>
  );
};

export default FooterLabels;
