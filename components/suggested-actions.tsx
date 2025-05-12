'use client';

import { motion } from 'framer-motion';
import { BoxIcon, RouteIcon, InvoiceIcon, GlobeIcon } from './icons';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import { GlowingEffect } from './ui/glowing-effect';

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
      className="grid sm:grid-cols-2 gap-4 w-full"
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
          <div className="relative min-h-[90px] w-full rounded-[0.875rem] border-[0.75px] border-border p-1.5">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <button 
              type="button"
              onClick={async () => {
                window.history.replaceState({}, '', `/chat/${chatId}`);

                append({
                  role: 'user',
                  content: suggestedAction.action,
                });
              }}
              className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border-[0.75px] bg-background p-3 shadow-sm dark:shadow-[0px_0px_20px_0px_rgba(45,45,45,0.2)] cursor-pointer text-left w-full"
            >
              <div className="relative flex flex-col justify-between gap-2">
                <div className="w-fit rounded-md border-[0.75px] border-border bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-1.5 text-white">
                  {suggestedAction.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold font-sans tracking-[-0.02em] text-balance text-foreground">
                    {suggestedAction.title}
                  </h3>
                  <p className="font-sans text-xs leading-[1.125rem] text-muted-foreground">
                    {suggestedAction.label}
                  </p>
                </div>
              </div>
            </button>
          </div>
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