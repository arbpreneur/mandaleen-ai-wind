'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { BoxIcon, RouteIcon, InvoiceIcon, GlobeIcon } from './icons';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  append,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Create a meal plan',
      label: 'for muscle gain',
      action: 'Create a weekly meal plan focused on muscle gain.',
      icon: <BoxIcon size={20} />,
    },
    {
      title: 'Suggest a workout',
      label: 'for fat loss',
      action: 'Suggest a 30-minute workout routine for fat loss.',
      icon: <RouteIcon size={20} />,
    },
    {
      title: 'Track my calories',
      label: 'for today',
      action: 'Help me track my calorie intake for today.',
      icon: <InvoiceIcon size={20} />,
    },
    {
      title: 'Give hydration tips',
      label: 'for active people',
      action: 'What are the best hydration tips for someone with an active lifestyle?',
      icon: <GlobeIcon size={20} />,
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-2 sm:flex-col w-full h-auto justify-start items-start transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-lg hover:scale-[1.03] focus-visible:bg-zinc-100 focus-visible:dark:bg-zinc-800 focus-visible:shadow-lg focus-visible:scale-[1.03] hover:text-black focus-visible:text-black"
          >
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-md text-white">
                {suggestedAction.icon}
              </span>
              <span className="font-medium">{suggestedAction.title}</span>
            </span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
