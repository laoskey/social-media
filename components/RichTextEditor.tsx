import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { theme } from "@/constants/theme";

interface RichTextEditorProps {
  editorRef: React.RefObject<any>;
  onChange: (body: any) => void;
}
function RichTextEditor({ editorRef, onChange }: RichTextEditorProps) {
  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        actions={[
          actions.setStrikethrough,
          actions.removeFormat,
          actions.setBold,
          actions.setItalic,
          actions.insertOrderedList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.code,
          actions.line,
          actions.heading1,
          actions.heading4,
          actions.insertImage,
          actions.insertBulletsList,
          actions.insertLink,
          actions.keyboard,
          actions.setUnderline,
          actions.insertVideo,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>,
          [actions.heading4]: ({ tintColor }: any) => <Text style={{ color: tintColor }}>H4</Text>,
        }}
        style={styles.richBar}
        flatContainerStyle={styles.flatStyle}
        selectedIconTint={theme.colors.primaryDark}
        editor={editorRef}
        disabled={false}
      />
      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.containerStyle}
        placeholder="What's your mind?"
        onChange={onChange}
      />
    </View>
  );
}

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },

  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    padding: 5,
  },
  containerStyle: {
    color: theme.colors.textDark,
    // placeholderColor: "gray",
  },
  flatStyle: {
    paddingHorizontal: 20,
    gap: 3,
  },
});
