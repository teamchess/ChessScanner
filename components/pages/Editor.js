import React from "react";
import { Clipboard, TouchableOpacity, TouchableWithoutFeedback, View, Text, Image } from "react-native";

import Button from "../ui/Button";
import Board from "../board/Board";

import styles from "../../styles/pages/editor";
import { PIECES as PIECES_IMAGES } from "../board/Piece";

const FEN_DEFAULT = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      certainty: null,
      fen: FEN_DEFAULT,
      buttonPressed: false,
      piecePickerColor: "white"
    };

    this.setPickerColor = this.setPickerColor.bind(this);
  }

  setPickerColor(color) {
    this.setState({
      piecePickerColor: color
    })
  }

  render() {
    return (
      <View styles={styles.container}>
        <Board style={styles.board} fen={this.state.fen} />
        <FenDisplay fen={this.state.fen} />
        <PieceSelector piecePickerColor={this.state.piecePickerColor} setPickerColor={this.setPickerColor} />
        <View style={styles.actionButtonContainer}>
          <ActionButton source={require("../../assets/icons/reverse.png")} onPress={}/>
          <ActionButton source={require("../../assets/icons/reset.png")} />
          <ActionButton source={require("../../assets/icons/save.png")} />
          <ActionButton source={require("../../assets/icons/upload.png")} />
        </View>
      </View>
    );
  }
}

const FenDisplay = props => {
  return (
    <View style={styles.fenDisplay}>
      <Text style={styles.fenText} numberOfLines={1} ellipsizeMode="tail">
        {props.fen}
      </Text>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => Clipboard.setString(props.fen)}>
          <Image style={styles.copyIcon} source={require("../../assets/icons/copy.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PieceSelector = props => {
  return (
    <View style={styles.pieceSelector}>
      <View style={styles.colorSelector}>
        <View style={styles.colorSelectorGraphic}>
          <TouchableWithoutFeedback onPress={() => props.setPickerColor("white")}>
            <View style={styles.colorSelectorWhite} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => props.setPickerColor("black")}>
            <View style={styles.colorSelectorBlack} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.piecePicker}>
        {["pawn", "bishop", "knight", "rook", "queen", "king"].map(p => (
          <PieceSelectorPiece color={props.piecePickerColor} source={PIECES_IMAGES[p]} key={p} />
        ))}
      </View>
    </View>
  );
};

const PieceSelectorPiece = props => {
  return <Image style={{ ...styles.piecePickerPiece, tintColor: props.color }} source={props.source} />;
};

const ActionButton = props => {
  return <Button style={styles.actionButton} {...props} />
}