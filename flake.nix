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

            yamlfmt
            yamllint
          ];
        };
      });
    };
}
