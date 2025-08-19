import { History, Wallet } from "lucide-react";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <IconButton
        icon={History}
        label="Transaction History"
        onClick={() => navigate("/transaction-history")}
      />
      <IconButton
        icon={Wallet}
        label="Money Requests"
        onClick={() => navigate("/requests")}
      />
    </div>
  );
}
