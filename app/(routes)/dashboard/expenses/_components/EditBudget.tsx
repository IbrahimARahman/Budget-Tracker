import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { budgetQuery } from "@/types/queries";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export default function EditBudget({
  budgetInfo,
  refreshData,
}: {
  budgetInfo: budgetQuery;
  refreshData: () => Promise<void>;
}) {
  const [emojiIcon, setEmojiIcon] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const { user } = useUser();

  useEffect(() => {
    if(budgetInfo){
      setEmojiIcon(budgetInfo.icon);
      setName(budgetInfo.name);
      setAmount(budgetInfo.amount);
    }
  }, [budgetInfo]);

  const onEditBudget = async () => {
    const result = await db.update(Budgets).set({
        name: name,
        amount: String(amount),
        icon: emojiIcon,
      }).where(eq(Budgets.id, budgetInfo.id))
      .returning();

      if(result){
        refreshData();
        toast("Budget Updated!");
      }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Name</h2>
                  <Input
                    placeholder="e.g. Groceries"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Amount</h2>
                  <Input
                    placeholder="e.g. 500"
                    type="number"
                    defaultValue={budgetInfo?.amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onEditBudget()}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
