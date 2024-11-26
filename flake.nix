# Copyright (C) 2024 Pavel Sobolev
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

{
  inputs = {
    nixpkgs.url = "github:paveloom/nixpkgs/system";
  };

  outputs =
    {
      nixpkgs,
      ...
    }:
    let
      systems = [ "x86_64-linux" ];
      forSystems =
        function:
        nixpkgs.lib.genAttrs systems (
          system:
          function (
            import nixpkgs {
              inherit system;
            }
          )
        );
    in
    {
      devShells = forSystems (pkgs: {
        default = pkgs.mkShell {
          name = "morbo-shell";
          nativeBuildInputs = with pkgs; [
            bashInteractive
            nixd
            nixfmt-rfc-style

            ios-safari-remote-debug
            ios-webkit-debug-proxy
            nodejs_latest
            typescript-language-server
            vscode-langservers-extracted

            go_1_23
            (gopls.override {
              buildGoModule = pkgs.buildGo123Module;
            })

            bash-language-server
            dockerfile-language-server-nodejs
            hadolint
            yamlfmt
            yamllint
          ];
        };
      });
    };
}
